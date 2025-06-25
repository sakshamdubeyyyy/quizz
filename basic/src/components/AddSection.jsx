import SectionForm from "./SectionForm";

const SectionsList = ({ sections = [], handleSectionUpdate, addSectionField }) => {
    return (
      <div className="space-y-6">
        {sections.map((section, sIdx) => (
          <SectionForm
            key={sIdx}
            index={sIdx}
            section={section}
            onSectionChange={(updated) => handleSectionUpdate(sIdx, updated)}
          />
        ))}
  
        <button
          type="button"
          onClick={addSectionField}
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition cursor-pointer"
        >
          + Add Another Section
        </button>
      </div>
    );
  };

  export default SectionsList;