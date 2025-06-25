import AddSubjectWithSectionsForm from "./AddSubjectsWithSectionsForm";

const AddQuiz = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-cyan-800 mb-6 border-b pb-4">
          Create New Quiz
        </h1>
        <AddSubjectWithSectionsForm />
      </div>
    </div>
  );
};

export default AddQuiz;
