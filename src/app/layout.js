import './globals.css';
import 'antd/dist/reset.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; // Optional if you use slick theme

export default function Layout({ children }) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    );
}
