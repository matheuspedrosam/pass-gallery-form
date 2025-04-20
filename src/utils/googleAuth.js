export default function googleAuth() {
    const scopes = import.meta.env.VITE_SCOPES
    const redirect_uri = `${window.location.origin}/auth/callback`;
    const client_id = import.meta.env.VITE_CLIENT_ID;

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scopes}&access_type=offline&response_type=code&redirect_uri=${redirect_uri}&client_id=${client_id}&include_granted_scopes=true&prompt=consent`;

    window.location.href = authUrl;
}