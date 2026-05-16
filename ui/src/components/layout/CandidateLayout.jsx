const CandidateLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        Hệ thống tuyển sinh
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
};

export default CandidateLayout;