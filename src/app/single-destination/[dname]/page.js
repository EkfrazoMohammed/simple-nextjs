
"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Use next/navigation for App Router
import { Carousel, Skeleton } from 'antd';
import Link from 'next/link';
import { API, baseURL } from './../../api/apirequest';
import styles from './SingleDestination.module.scss'; // Import your Sass file

const SingleDestination = () => {
    const { dname } = useParams(); // Use useParams to get dynamic route parameters

    const [value, setValue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [packages, setPackages] = useState([]);
    const [error, setError] = useState(false);
    const [bgimage, setBgimage] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                let d = await API(`/api/all-destinations?populate=*&filters[name][$containsi]=${dname}`);
                setValue(d.data.data);
                let filterData = d.data.data[0].attributes.all_package.data.map(v => v);
                setPackages(filterData);

                let images = d.data.data[0].attributes.images.data.map(v => v);
                setBgimage(images);

                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        };
        if (dname) {
            getData();
        }
        window.scrollTo(0, 0);
    }, [dname]);

    return (
        <>
       
            <div className={styles.singleDestinationSection}>
            
                <div className={styles.singleDestinationContainer}>
                    {loading ? (
                        <Skeleton active />
                    ) : (
                        <>
                            {error ? (
                                <div className={styles.sectionTitle}>No destination found</div>
                            ) : (
                                <>
                                    {packages.length === 0 ? (
                                        <>
                                            <div className={styles.sectionTitle}>
                                                No standard packages found
                                             
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={styles.sectionTitle}>{value[0]?.attributes?.name}</div>
                                            <div className={styles.cardContainer}>
                                                {packages.sort((a, b) => a.id > b.id ? 1 : -1).map(val => (
                                                    <Link key={val.id} href={`/single-package/${val?.attributes?.package_id}`}>
                                                        <div className={styles.cardContent}>
                                                            <div className={styles.cardImage}>
                                                                <img
                                                                    className={styles.img}
                                                                    width={100}
                                                                    height={100}
                                                                       style={{width:"200px",height:"200px"}}
                                                                    loading="lazy"
                                                                    src={`${baseURL}${val?.attributes?.package_images?.data[0]?.attributes?.url}`}
                                                                    alt={val?.attributes?.package_images?.data[0]?.attributes?.name}
                                                                />
                                                            </div>
                                                            
                                                            <div className={styles.cardOverlay}>
                                                                <div className={styles.upper}>
                                                                    <div className={styles.cardTitle}>{val?.attributes?.name}</div>
                                                                    <div className={styles.cardPackage}>
                                                                        {(val?.attributes?.package_nights) === 0 ? (
                                                                            <>{`${(val?.attributes?.package_nights) + 1} Day`}</>
                                                                        ) : (
                                                                            <>
                                                                                {(val?.attributes?.package_nights) === 1 ? (
                                                                                    <>{`${(val?.attributes?.package_nights) + 1} Days / ${val?.attributes?.package_nights} Night`}</>
                                                                                ) : (
                                                                                    <>{`${(val?.attributes?.package_nights) + 1} Days / ${val?.attributes?.package_nights} Nights`}</>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className={styles.cardPackageId}>
                                                                    Package ID: {val?.attributes?.package_id}
                                                                </div>
                                                            </div>
                                                            <div className={styles.middle}>
                                                                <div className={styles.text}>
                                                                    <button className={styles.formButton}>Click to Enquire</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default SingleDestination;
