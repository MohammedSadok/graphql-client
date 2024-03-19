import "./App.css";
import OptionForm from "./components/opiton-form";
import OptionTable from "./components/option-table";

function App() {
  return (
    <div className="flex flex-col min-h-screen space-y-6">
      {/* <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex items-center justify-between h-16 py-4">
        </div>
      </header> */}

      <main className="grid grid-cols-[400px_minmax(900px,_1fr)_100px] gap-6">
        <OptionForm />
        <OptionTable />
      </main>
    </div>
  );
}

export default App;
