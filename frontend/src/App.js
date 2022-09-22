import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import BlogList from './Pages/BlogList';
import BlogDetail from './Pages/BlogDetail';
import Home from './Pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blogs" element={<BlogList/>}/>
        <Route path="blog-detail/:id" element={<BlogDetail/>}/>
      </Routes>
    </>
  );
}

export default App;
