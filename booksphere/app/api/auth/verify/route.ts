
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({
        success: false,
        message: 'No token provided',
      }, { status: 401 });
    }

    // For now, redirect to the Express server
    // In production, call Express server at localhost:5000
    return Response.json({
      success: false,
      message: 'Please use the Express server at localhost:5000 for authentication',
      redirectUrl: 'http://localhost:5000/api/auth/verify'
    }, { status: 302 });
  } catch (error) {
    console.error('Token verification error:', error);
    return Response.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}
