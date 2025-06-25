const SubjectInput = ({ subjectName, setSubjectName }) => {
    return (
        <input
        type="text"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        placeholder="Subject Name"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
      />      
    );
  };
  
  export default SubjectInput;
  