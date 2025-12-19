import PropTypes from 'prop-types';

YearSelector.propTypes = {
    selectedYear: PropTypes.number,
    onYearChange: PropTypes.func.isRequired,
};

export default function YearSelector({ selectedYear, onYearChange }) {
    return (
        <div className="flex flex-col justify-center items-center gap-6 z-50 relative">
            <h2 className="text-white text-4xl font-exo2 font-bold text-center">Select a Year</h2>
            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={() => onYearChange(2025)}
                    className={`px-8 py-4 rounded-full font-grotesk font-bold text-lg transition ${
                        selectedYear === 2025
                            ? 'bg-[#c593e9] text-white hover:bg-[#cfb0e8]'
                            : 'border-2 border-white text-white hover:bg-gray-700'
                    }`}
                >
                    2025
                </button>
                <button
                    onClick={() => onYearChange(2026)}
                    className={`px-8 py-4 rounded-full font-grotesk font-bold text-lg transition ${
                        selectedYear === 2026
                            ? 'bg-[#c593e9] text-white hover:bg-[#cfb0e8]'
                            : 'border-2 border-white text-white hover:bg-gray-700'
                    }`}
                >
                    2026
                </button>
            </div>
        </div>
    );
}

