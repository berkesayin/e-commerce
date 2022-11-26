import React from "react";

/*  Header.js ve Footer.js componentleri oluşturulurken 'export default Header've 'export default Footer' 
şeklinde export edildikleri için burada {} içerisinde belirtmeye gerek olmadan Header, Footer diyerek 
import edebiliyoruz. */

// importing Header.js component:
import Header from "./components/Header";

// importing Footer.js component:
import Footer from "./components/Footer";

// importing components from react-bootstrap
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome To Online Store</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
