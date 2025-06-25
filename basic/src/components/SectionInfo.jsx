const SectionInfo = ({ title, description }) => (
    <div className="mb-4 border-b pb-4">
      <h2 className="text-2xl font-semibold text-indigo-600">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
  
  export default SectionInfo;
  