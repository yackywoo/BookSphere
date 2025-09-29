
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return Response.json({
        success: false,
        message: 'Email and password are required',
      }, { status: 400 });
    }

    // For now, redirect to the Express server
    // In production, you should call your Express server at localhost:5000
    return Response.json({
      success: false,
      message: 'Please use the Express server at localhost:5000 for authentication',
      redirectUrl: 'http://localhost:5000/api/auth/signin'
    }, { status: 302 });
  } catch (error) {
    console.error('Signin error:', error);
    return Response.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}
