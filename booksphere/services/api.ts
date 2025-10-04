const API_BASE_URL = 'http://10.0.2.2:5000';

export const fetchBookPdfUrl = async (title: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books?title=${encodeURIComponent(title)}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Book not found');
    }

    const data = await response.json();
    if (!data.pdf_url) {
      throw new Error('PDF URL not found');
    }

    return data.pdf_url;

  } catch (error) {
    console.error("Error:", error as Error);
    throw error;
  }
};