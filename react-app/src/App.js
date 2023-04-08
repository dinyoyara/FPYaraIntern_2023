import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global.css';
import Body from './components/body';
import ContextProvider from './context';

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <ContextProvider>
                <Body />
            </ContextProvider>
        </BrowserRouter>
    );
}

export default App;
