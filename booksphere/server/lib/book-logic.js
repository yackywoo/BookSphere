const { MongoClient } = require('mongodb');
require('dotenv').config();

async function getOrFetchBookPdfUrl(title) {
    const MONGODB_URI = process.env.MONGODB_URI;
    const client = new MongoClient(MONGODB_URI);
    console.log(`REQUESTING PDF URL FOR '${title}'...`);
    try {
        await client.connect();
        const db = client.db('booksphere');
        const booksCollection = db.collection('books');

        //Step 1: Check database first with Atlas Search
        const pipeline = [
        {
            $search: {
                index: 'title',
                text: {
                    query: title,
                    path: {
                        wildcard: '*'
                    }
                }
            }
        }, { $limit: 1 }

        ];
        const cursor = booksCollection.aggregate(pipeline);
        const existingBook = await cursor.next();

        // Return PDF URL if found in database
        // Else not in database, search OpenLibrary
        if (existingBook) {
            console.log(`Found '${existingBook.title}' in the database.`);
            return existingBook.pdf_url;
        }

        // Step 2: Check OpenLibrary's API
        const searchUrl = `https://openlibrary.org/search.json?q=title:"${encodeURIComponent(title)}"&language=eng`;
        const olResponse = await fetch(searchUrl);
        const olData = await olResponse.json();

        let bookCandidate = null;
        for (const doc of olData.docs || []) {
            const apiTitle = (doc.title || '').toLowerCase();
            // Check if (public eBook + IA links + matching title) entry exists in OpenLibrary's response
            if (doc.ebook_access === 'public' && doc.ia && apiTitle.includes(title.toLowerCase())) {
                bookCandidate = doc;
                break;
            }
        }

        if (!bookCandidate) {
            console.log(`Could not find a suitable public domain version for '${title}' online.`);
            return null;
        }

        // Step 3: Verify English + PDF copy of the book exists in IA link
        let pdfUrl = null;
        for (const identifier of bookCandidate.ia || []) {
            try {
                const metaUrl = `https://archive.org/metadata/${identifier}`;
                const metaResponse = await fetch(metaUrl);
                const metadata = await metaResponse.json();
                const scanLanguage = (metadata?.metadata?.language || '').toLowerCase();
                if (['eng', 'english'].includes(scanLanguage)) {
                    const pdfFile = metadata.files.find(f => f.name.endsWith('.pdf'));
                    if (pdfFile) {
                        pdfUrl = `https://archive.org/download/${identifier}/${encodeURIComponent(pdfFile.name)}`;
                        break;
                    }
                }
            } catch (e) {
                continue;
            }
        }

        if (!pdfUrl) {
            console.log(`Could not find a verifiable English PDF scan for '${title}'.`);
            return null;
        }

        // Step 4: Add the new book to the database and return PDF URL
        const newBookMapping = {
            title: bookCandidate.title,
            author: bookCandidate.author_name ? bookCandidate.author_name.join(', ') : 'N/A',
            publish_year: bookCandidate.first_publish_year,
            pdf_url: pdfUrl,
        };

        await booksCollection.insertOne(newBookMapping);
        console.log(`Successfully ADDED '${newBookMapping.title}' to the database.`);
        return pdfUrl;

    } catch (err) {
        console.error('An error occurred:', err);
        return null;
    } finally {
        await client.close();
    }
}

module.exports = { getOrFetchBookPdfUrl };