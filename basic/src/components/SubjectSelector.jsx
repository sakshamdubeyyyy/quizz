const SubjectSelector = ({ subjects, selectedSubjectId, onChange }) => (
    <>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Subject:</label>
        <select
            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
            value={selectedSubjectId}
            onChange={onChange}
        >
            <option value="">-- Choose a Subject --</option>
            {subjects.map(subject => (
                <option key={subject._id} value={subject._id}>{subject.name}</option>
            ))}
        </select>
    </>
);

export default SubjectSelector;
