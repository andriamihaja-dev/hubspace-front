import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import AuthGate from '@/pages/AuthGate';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

// Profil
import UserProfile from '@/pages/profile/UserProfile';
import EditProfile from '@/pages/profile/EditProfile';

// Social (fil d’actualité)
import FeedPage from '@/pages/social/FeedPage';
import PostCard from '@/pages/social/CreatePostCards';
import EditPost from '@/pages/social/EditPost';
import CommentCard from '@/pages/social/CreateCommentCard';


// Messages
import MessagesList from '@/pages/messages/MessagesList';
import MessagePage from '@/pages/messages/MessagePage';
import CreateGroup from '@/pages/messages/CreateGroup';
import GroupMembers from '@/pages/messages/GroupMembers';

// Friends
import FriendsList from '@/pages/friends/FriendsList';
import FriendRequests from '@/pages/friends/FriendRequests';

// Notifications
import NotificationsPage from '@/pages/NotificationsPage';

// Drive
import DrivePage from '@/pages/drive/DrivePage';
import UploadPage from '@/pages/drive/UploadPage';

export default function App() {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div className="p-4 text-center">Chargement...</div>;

  return (
    <Routes>
      {/* Page d’accueil : auth uniquement */}
      <Route
        path="/"
        element={user ? <Navigate to="/feed" replace /> : <AuthGate />}
      />

      {/* Routes protégées */}
      <Route element={<ProtectedLayout />}>
        <Route path="/feed" element={<FeedPage />} />

        {/* Profil */}
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/profile/edit" element={<EditProfile />} />

        {/* Social */}
        <Route path="/post/new" element={<PostCard />} />
        <Route path="/post/:postId/edit" element={<EditPost />} />
        <Route path="/comment/:commentId/edit" element={<CommentCard postId={0} />} />
        <Route path="/comment/new/:postId" element={<CommentCard postId={0} />} />


        {/* Messages */}
        <Route path="/messages" element={<MessagesList />} />
        <Route path="/messages/:conversationId" element={<MessagePage />} />
        <Route path="/groups/new" element={<CreateGroup />} />
        <Route path="/groups/:groupId/members" element={<GroupMembers />} />

        {/* Friends */}
        <Route path="/friends" element={<FriendsList />} />
        <Route path="/friend-requests" element={<FriendRequests />} />

        {/* Notifications */}
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* Drive */}
        <Route path="/drive" element={<DrivePage />} />
        <Route path="/drive/upload" element={<UploadPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
