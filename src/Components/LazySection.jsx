import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

LazySection.propTypes = {
    children: PropTypes.node.isRequired,
    rootMargin: PropTypes.string,
};

export default function LazySection({ children, rootMargin = '200px' }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div ref={ref}>
            {isVisible ? children : <div style={{ minHeight: '200px' }} />}
        </div>
    );
}
