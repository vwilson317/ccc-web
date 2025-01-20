export const Login = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };