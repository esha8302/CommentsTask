import { Routes, Route } from 'react-router-dom';
import BlogList from './Pages/BlogList';
import BlogDetail from './Pages/BlogDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogList/>}/>
        <Route path="blog-detail/:id" element={<BlogDetail/>}/>
      </Routes>
    </>
  );
}

export default App;
