"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Skeleton } from 'antd';
import styles from './Destinations.module.scss'; // Import your Sass file
import { API, baseURL } from './../api/apirequest';

const AllDestinations = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                let d = await API.get('/api/all-destinations?populate=*');
                setData(d.data.data);
                setLoading(false);
            } catch (err) {
                setLoading(true);
            }
        };
        getData();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.section}>
          
            <div className={styles.destinationContainer}>
                {loading ? (
                    <Skeleton active />
                ) : (
                    <>
                        <div className={styles.sectionTitle}>All Destinations</div>
                        <div className={styles.cardContainer} style={{ display:"flex",flexWrap: 'wrap',gap:"2rem" }}>
                            {data.sort((a, b) => a.id > b.id ? 1 : -1).map((val) => (
                                <Link key={val.id} href={`/single-destination/${val?.attributes?.name}`}>
                                    <div className={styles.cardContent}>
                                        <div className={styles.cardImage}>
                                            <img
                                            width={100}
                                            height={100}
                                               style={{width:"200px",height:"200px"}}
                                                loading="lazy"
                                                src={`${baseURL}${val?.attributes?.images?.data[0]?.attributes?.url}`}
                                                alt={val?.attributes?.images?.data[0]?.attributes?.name}
                                            />
                                        </div>
                                        <div className={styles.cardOverlay}>
                                            <div className={styles.upper}>
                                                <div className={styles.cardTitle}>{val?.attributes?.name}</div>
                                            </div>
                                            <div className={styles.bottom}>
                                                <div className={styles.cardPackageDetails}>
                                                    <div className={styles.left}>{val?.attributes?.packages} Packages</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllDestinations;
