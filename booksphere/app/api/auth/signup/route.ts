
export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      return Response.json({
        success: false,
        message: 'All fields are required',
      }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({
        success: false,
        message: 'Please enter a valid email address',
      }, { status: 400 });
    }

    // Password validation
    if (password.length < 6) {
      return Response.json({
        success: false,
        message: 'Password must be at least 6 characters long',
      }, { status: 400 });
    }

    // For now, redirect to the Express server
    // In production, call Express server at localhost:5000
    return Response.json({
      success: false,
      message: 'Please use the Express server at localhost:5000 for authentication',
      redirectUrl: 'http://localhost:5000/api/auth/signup'
    }, { status: 302 });
  } catch (error) {
    console.error('Signup error:', error);
    return Response.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}
