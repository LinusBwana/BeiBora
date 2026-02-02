import { Container, Navbar as BSNavbar } from 'react-bootstrap';

function Navbar() {
    return (
        <BSNavbar bg="dark" variant="dark" expand="lg">
            <Container>
                <BSNavbar.Brand href="/">
                    BeiBora Shop
                </BSNavbar.Brand>
            </Container>
        </BSNavbar>
    );
}

export default Navbar;