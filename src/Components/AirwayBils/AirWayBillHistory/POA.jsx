import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import.meta.env.VITE_IMAGE_STORAGE_API

const POA = ({ AwbDetails }) => {
    const trackingDetail = useSelector((state) => state.TrackingDetailsReducer);
    const [activeFilter, setActiveFilter] = useState('Attempt1');

    const handleFilterChange = (filter) => setActiveFilter(filter);

    // const images = [
    //     { id: 1, src: `${process.env.VITE_IMAGE_STORAGE_API}${moment(AwbDetails.StatusDate).format("YYYY-MM-DD")}/${AwbDetails.Awbno}/image1.jpg`, category: 'Attempt 1' },
    //     { id: 2, src: `${process.env.VITE_IMAGE_STORAGE_API}${moment(AwbDetails.StatusDate).format("YYYY-MM-DD")}/${AwbDetails.Awbno}/image2.jpg`, category: 'Attempt 2' },
    // ];

    // const filteredImages = images.filter((image) => image.category === activeFilter);

    const handleImageDownload = async () => {
        try {
            const imageUrl = trackingDetail?.POAImages?.[activeFilter];
            if (!imageUrl) return;

            // Try to open in new tab and trigger download (depends on server headers)
            const newWindow = window.open(imageUrl, '_blank');

            // If new tab is blocked or download doesn't start, fallback to fetch
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                throw new Error('Popup blocked or tab closed');
            }
        } catch (error) {
            console.error('New tab failed:', error);
            // Fallback to fetch-based download
            try {
                const response = await fetch(imageUrl);
                if (!response.ok) throw new Error('Failed to fetch');
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `POA_${activeFilter}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (fetchError) {
                console.error('Fallback fetch failed:', fetchError);
                // Ultimate fallback: Open URL in same tab
                window.open(imageUrl, '_blank');
            }
        }
    };

    return (
        <div className="container">
            <div>
                <div className='tab-buttons transaction d-inline-flex pod-tab'>
                    {trackingDetail?.POAImagesFilter?.length > 0 && trackingDetail.POAImagesFilter.map((filter) => (
                        <div
                            key={filter}
                            className={`headtab  ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => handleFilterChange(filter)}
                        >
                            <h6 className="text-dark headtab">
                                {filter.charAt(0).toUpperCase() + filter.slice(1)} </h6>

                        </div>
                    ))}
                </div>
            </div>
            <div className="row">
                {trackingDetail?.POAImages?.[activeFilter] && (
                    <div className={`gallery_product col-md-4 filter `}>
                        <img
                            src={trackingDetail?.POAImages?.[activeFilter]}
                            alt={activeFilter}
                            onError={(e) => e.target.src = "/not-available.svg"}
                            onClick={handleImageDownload}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                )}
            </div>
        </div>

    );
};

export default POA;
