// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './index.css';

// const Footer = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const footerStyle = {
//     position: 'relative',
//     bottom: 0,
//     width: '100%',
//     height: '170px', 
//     backgroundColor: '#000',
//     color: '#fff',
//    marginTop:'30%',
//   };

//   return (
//     <div style={footerStyle}>
//       <div >
//         {location.pathname !== '/' && (
//           <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
//             &larr; Go Back
//           </button>
//         )}
//         <div className="main-footer__row main-footer__row-2">
//           <h2 className="heading heading-sm text-lt">
//             Designed &amp; coded{' '}
//             <span
//               className="emoji"
//               role="img"
//               aria-label="heart"
//               aria-hidden="false"
//             >
//               ❤️
//             </span>{' '}
//             by the Ranch Trio team.
//           </h2>
//           <div className="main-footer__short-esc">
//             <ul id="contributors">
//               <li>
//                 <a href="https://github.com/k-pineda" target="_blank" className="hover">
//                   Karen
//                 </a>
//               </li>
//               <li>
//                 <a href="https://github.com/Josiahr4321" target="_blank" className="hover">
//                   Josiah
//                 </a>
//               </li>
//               <li>
//                 <a href="https://github.com/Anthony-D99" target="_blank" className="hover">
//                   Anthony
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="main-footer__lower">
//           &copy; Copyright <script>document.write(new Date().getFullYear())</script>. Made by{' '}
//           <a rel="noreferrer" target="_blank" href="https://github.com/k-pineda/ShelfSwap">
//             Ranch Trio
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;
