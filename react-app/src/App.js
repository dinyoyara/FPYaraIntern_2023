import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global.css';
import Body from './components/body';

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Body />
        </BrowserRouter>
    );
}

export default App;
