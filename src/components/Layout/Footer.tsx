import React from "react";
export default function Footer() {
  return (
    <footer className="footer bg-black py-4 mt-5">
      <div className="container-xl">
        <div className="row">
          <div className="col-12 text-center">
            <div className="mb-2">
              <h5 className="mb-3 text-white">Contact Us</h5>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                <div>
                  <a href="mailto:support@ticketapp.com" className="text-white text-decoration-none">
                    support@ticketapp.com
                  </a>
                </div>
                <div>
                  <a href="tel:+2340801234567" className="text-white text-decoration-none">
                    +234 080 123 4567
                  </a>
                </div>
              </div>
            </div>
            <p className="mb-0 text-white">© 2025 TicketApp Management.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
