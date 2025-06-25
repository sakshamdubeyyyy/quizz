import React, { useState } from 'react';
import { useGetUserResults } from '../utils/useGetUserResults';
import SubjectSelector from './SubjectSelector';
import ResultDetails from './ResultDetails';

const ViewResults = () => {
    const userId = localStorage.getItem("userId");
    const { data: results, isLoading } = useGetUserResults(userId);
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [currentResultIndex, setCurrentResultIndex] = useState(0);

    if (isLoading) return <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>;

    const uniqueSubjects = [...new Map(results.map(item => [item?.subject?._id, item.subject])).values()];
    const filteredResults = selectedSubjectId
        ? results.filter(result => result.subject._id === selectedSubjectId).sort((a, b) => new Date(b.date) - new Date(a.date))
        : [];

    const currentResult = filteredResults[currentResultIndex];

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-lg mt-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">📊 Your Quiz Results</h1>

            <SubjectSelector
                subjects={uniqueSubjects}
                selectedSubjectId={selectedSubjectId}
                onChange={e => {
                    setSelectedSubjectId(e.target.value);
                    setCurrentResultIndex(0);
                }}
            />

            {currentResult ? (
                <ResultDetails
                    result={currentResult}
                    currentIndex={currentResultIndex}
                    total={filteredResults.length}
                    onNext={() => setCurrentResultIndex(i => i + 1)}
                    onPrev={() => setCurrentResultIndex(i => i - 1)}
                />
            ) : selectedSubjectId ? (
                <p className="text-gray-600 text-center mt-8">No results found for this subject.</p>
            ) : null}
        </div>
    );
};

export default ViewResults;
