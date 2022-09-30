import React, { useEffect, useRef } from 'react'
import styles from "./_IFD.module.css";

const PreLoader = () => {
    const preloader = useRef(null)
    const removePreloader = () => {
        preloader.current.style.display = "none";
    }
    useEffect(() => {
        if (document.readyState === "complete") return removePreloader();
        window.addEventListener("load", removePreloader, { once: true });
    }, [document.readyState]);
    return (
        <div ref={preloader} className={styles['preloader']}>
            <svg style={{ margin: 'auto', background: 'rgba(241, 242, 243, 0)', display: 'block' }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <g transform="translate(20 50)">
                    <circle cx={0} cy={0} r={5} fill="#411a7a">
                        <animateTransform attributeName="transform" type="scale" begin="-0.4076086956521739s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1.0869565217391304s" repeatCount="indefinite" />
                    </circle>
                </g><g transform="translate(40 50)">
                    <circle cx={0} cy={0} r={5} fill="#46168b">
                        <animateTransform attributeName="transform" type="scale" begin="-0.2717391304347826s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1.0869565217391304s" repeatCount="indefinite" />
                    </circle>
                </g><g transform="translate(60 50)">
                    <circle cx={0} cy={0} r={5} fill="#321065">
                        <animateTransform attributeName="transform" type="scale" begin="-0.1358695652173913s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1.0869565217391304s" repeatCount="indefinite" />
                    </circle>
                </g><g transform="translate(80 50)">
                    <circle cx={0} cy={0} r={5} fill="#4e248d">
                        <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1.0869565217391304s" repeatCount="indefinite" />
                    </circle>
                </g>
            </svg>


        </div>
    )
}

export default PreLoader