import { API, baseURL } from './../../api/apirequest'; // Adjust import path as needed

export async function generateMetadata({ params }) {
    const { id } = params;

    try {
        const response = await API.get(`/api/all-packages?populate=*&filters[package_id][$eq]=${id}`);
        const data = response.data.data[0];

        // Handle missing image URL
        const firstImageUrl = data.attributes.package_images?.data?.[0]?.attributes?.url || '';

        return {
            title: data.attributes.name,
            description: data.attributes.description || 'Default description',
            openGraph: {
                title: data.attributes.name,
                description: data.attributes.description || 'Default description',
                images: [
                    {
                        url: `${baseURL}${firstImageUrl}`,
                        alt: data.attributes.package_images?.data?.[0]?.attributes?.name || 'Package image',
                        width: 1200, // Specify width for better preview
                        height: 630, // Specify height for better preview
                    },
                ],
                siteName: 'Aventuras Holidays LLP',
                type: 'website',
                url: `${baseURL}/single-package/${id}`,
            },
            twitter: {
                card: 'summary_large_image',
                title: data.attributes.name,
                description: data.attributes.description || 'Default description',
                images: [
                    `${baseURL}${firstImageUrl}`,
                ],
            },
            // Additional SEO features
            canonical: `${baseURL}/single-package/${id}`,
            robots: {
                index: true,
                follow: true,
            },
            keywords: data.attributes.keywords || 'Travel, Package, Tourism', // Update with relevant keywords if available
        };
    } catch (err) {
        console.error('Error fetching metadata:', err.response?.data || err.message || err);
        return {
            title: 'Package Not Found',
            description: 'No package details available',
        };
    }
}

const SinglePackagePage = async ({ params }) => {
    const { id } = params;
    let data, error = null;

    try {
        const response = await API.get(`/api/all-packages?populate=*&filters[package_id][$eq]=${id}`);
        data = response.data.data[0]; // Assuming the data is an array and we need the first element
    } catch (err) {
        error = err.message;
    }

    return (
        <div>
            <h1>Package Details</h1>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <h2>{data.attributes.name}</h2>
                    <p>{data.attributes.description}</p>
                    <img src={`${baseURL}${data.attributes.package_images?.data?.[0]?.attributes?.url}`} alt={data.attributes.package_images?.data?.[0]?.attributes?.name || 'Package image'} 
                      width={100}
                      height={100}
                         style={{width:"200px",height:"200px"}}
                    />
                    <p><strong>Price:</strong> {data.attributes.Package_price}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
};

export default SinglePackagePage;
