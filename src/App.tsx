import { Routes, Route, Navigate } from 'react-router-dom';

import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Home, AllUsers, CreatePost, EditPost, Explore, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';

import './globals.css';
import { Toaster } from './components/ui/sonner';
import { useUserContext } from './context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
const { isAuthenticated, isLoading } = useUserContext();

if (isLoading) {
    return null;
}

if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
}

return <>{children}</>;
};

const App = () => {
return (
    <main className="flex h-screen">
        <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SigninForm />} />
                <Route path="/sign-up" element={<SignupForm />} />
            </Route>

            {/* private routes */}

            <Route element={
                <ProtectedRoute>
                    <RootLayout />
                </ProtectedRoute>
            }
        >
                <Route index element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/all-users" element={<AllUsers />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/update-post/:id" element={<EditPost />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/profile/:id/*" element={<Profile />} />
                <Route path="/update-profile/:id" element={<UpdateProfile />} />
            </Route>
        </Routes>

        <Toaster />
    </main>
)
}

export default App 