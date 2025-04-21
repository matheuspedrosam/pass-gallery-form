export default async function submitNewClient(data) {
    const passGalleryBaseUrlAPI = import.meta.env.VITE_PASS_GALLERY_BASE_API;

    const response = await fetch(passGalleryBaseUrlAPI + '/clients/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_PASS_GALLERY_API_TOKEN}`,
        },
        body: JSON.stringify(data)
    });

    console.log(response);

    if (!response.ok) {
        throw new Error('Failed to submit the form');
    }

    return response.json();
}