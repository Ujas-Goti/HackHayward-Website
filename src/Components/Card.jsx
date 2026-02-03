import PropTypes from 'prop-types';

Card.propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    pos: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
    flair: PropTypes.shape({
        spk: PropTypes.bool,
        jud: PropTypes.bool,
        mnt: PropTypes.bool,
    }).isRequired,
    imageScale: PropTypes.number,
    imagePosition: PropTypes.string,
};

export default function Card({ name, desc, pos, img, badge, flair, imageScale = 1, imagePosition = 'center' }) {
    return(
        <div className="card bg-white rounded-lg overflow-hidden shadow-md w-60 md:w-72 h-full">
            <figure className="w-full h-64">
                <img
                src={img}
                alt={name} 
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ 
                    transform: `scale(${imageScale})`,
                    objectPosition: imagePosition
                }}
                />
            </figure>
            <div className="p-6 text-black font-grotesk flex flex-col">
                <h2 className="text-xl font-bold mb-2">
                    {name}
                </h2>
                
                {/*<div className='flex flex-wrap gap-1 mb-2'> //Temporary disable
                    {flair.jud &&
                        <div className="badge badge-secondary badge-warning text-white px-3 py-1 rounded-full text-xs">Judge</div>
                    }
                    {flair.mnt &&
                        <div className="badge badge-secondary badge-error text-white px-3 py-1 rounded-full text-xs">Mentor</div>
                    }
                    {flair.spk &&
                        <div className="badge badge-secondary badge-info text-white px-3 py-1 rounded-full text-xs">Speaker</div>
                    }
                </div>*/}
                
                <div className="text-sm text-gray-800">
                    <p className="font-medium">{desc}</p>
                    <p className="mt-1">{pos}</p>
                </div>
                
                {badge && 
                <div className="flex justify-end mt-4">
                    <div className="badge badge-outline px-3 py-1 rounded-full text-xs">
                        {badge}
                    </div>
                </div>}
            </div>
        </div>
    );
}