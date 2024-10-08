const FILE_FORMAT = ["png", "jpg", "jpeg", "eps", "svg"];
const SIZE = ["small", "medium", "large"];

const MODES = [
  {
    name: "wifi",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.0002 19C11.4479 19 11.0002 19.4477 11.0002 20C11.0002 20.5523 11.4479 21 12.0002 21V19ZM12.0102 21C12.5625 21 13.0102 20.5523 13.0102 20C13.0102 19.4477 12.5625 19 12.0102 19V21ZM14.6907 17.04C15.0993 17.4116 15.7317 17.3817 16.1033 16.9732C16.475 16.5646 16.445 15.9322 16.0365 15.5605L14.6907 17.04ZM18.0541 13.3403C18.4626 13.7119 19.0951 13.682 19.4667 13.2734C19.8384 12.8649 19.8084 12.2324 19.3999 11.8608L18.0541 13.3403ZM7.96394 15.5605C7.55539 15.9322 7.52546 16.5646 7.89708 16.9732C8.26871 17.3817 8.90117 17.4116 9.30971 17.04L7.96394 15.5605ZM4.60055 11.8608C4.192 12.2324 4.16207 12.8649 4.53369 13.2734C4.90532 13.682 5.53778 13.7119 5.94633 13.3403L4.60055 11.8608ZM12.0002 21H12.0102V19H12.0002V21ZM12.0002 16C13.0369 16 13.9795 16.3931 14.6907 17.04L16.0365 15.5605C14.9715 14.5918 13.5538 14 12.0002 14V16ZM12.0002 11C14.3321 11 16.4548 11.8855 18.0541 13.3403L19.3999 11.8608C17.4468 10.0842 14.8489 9 12.0002 9V11ZM9.30971 17.04C10.0209 16.3931 10.9635 16 12.0002 16V14C10.4466 14 9.02893 14.5918 7.96394 15.5605L9.30971 17.04ZM5.94633 13.3403C7.54565 11.8855 9.66836 11 12.0002 11V9C9.15148 9 6.55365 10.0842 4.60055 11.8608L5.94633 13.3403Z"
          // fill="#000000"
        />
      </svg>
    ),
    description: "Generate a QR code for plain text",
  },
  {
    name: "email",
    icon: (
      <svg
        width="100px"
        height="100px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    description: "Generate a QR code for plain text",
  },
  {
    name: "phone",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 16C2.814 9.813 3.11 5.134 5.94 3.012l.627-.467a1.483 1.483 0 0 1 2.1.353l1.579 2.272a1.5 1.5 0 0 1-.25 1.99L8.476 8.474c-.38.329-.566.828-.395 1.301.316.88 1.083 2.433 2.897 4.246 1.814 1.814 3.366 2.581 4.246 2.898.474.17.973-.015 1.302-.396l1.314-1.518a1.5 1.5 0 0 1 1.99-.25l2.276 1.58a1.48 1.48 0 0 1 .354 2.096l-.47.633C19.869 21.892 15.188 22.187 9 16z"
          // fill="#000000"
        />
      </svg>
    ),
    description: "Generate a QR code for plain text",
  },
  {
    name: "url",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.7285 3.88396C17.1629 2.44407 19.2609 2.41383 20.4224 3.57981C21.586 4.74798 21.5547 6.85922 20.1194 8.30009L17.6956 10.7333C17.4033 11.0268 17.4042 11.5017 17.6976 11.794C17.9911 12.0863 18.466 12.0854 18.7583 11.7919L21.1821 9.35869C23.0934 7.43998 23.3334 4.37665 21.4851 2.5212C19.6346 0.663551 16.5781 0.905664 14.6658 2.82536L9.81817 7.69182C7.90688 9.61053 7.66692 12.6739 9.51519 14.5293C9.80751 14.8228 10.2824 14.8237 10.5758 14.5314C10.8693 14.2391 10.8702 13.7642 10.5779 13.4707C9.41425 12.3026 9.44559 10.1913 10.8809 8.75042L15.7285 3.88396Z"
          // fill="#1C274C"
        />
        <path
          d="M14.4851 9.47074C14.1928 9.17728 13.7179 9.17636 13.4244 9.46868C13.131 9.76101 13.1301 10.2359 13.4224 10.5293C14.586 11.6975 14.5547 13.8087 13.1194 15.2496L8.27178 20.1161C6.83745 21.556 4.73937 21.5863 3.57791 20.4203C2.41424 19.2521 2.44559 17.1408 3.88089 15.6999L6.30473 13.2667C6.59706 12.9732 6.59614 12.4984 6.30268 12.206C6.00922 11.9137 5.53434 11.9146 5.24202 12.2081L2.81818 14.6413C0.906876 16.5601 0.666916 19.6234 2.51519 21.4789C4.36567 23.3365 7.42221 23.0944 9.33449 21.1747L14.1821 16.3082C16.0934 14.3895 16.3334 11.3262 14.4851 9.47074Z"
          // fill="#1C274C"
        />
      </svg>
    ),
    description: "Generate a QR code for plain text",
  },
  // {
  //   name: "facebook",
  //   icon: (
  //     <svg
  //       fill="#000000"
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z" />
  //     </svg>
  //   ),
  //   description: "Generate a QR code for plain text",
  // },
  // {
  //   name: "event",
  //   icon: (
  //     <svg
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="currentColor"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         fill-rule="evenodd"
  //         clip-rule="evenodd"
  //         d="M7 2a1 1 0 0 0-1 1v1.001c-.961.014-1.34.129-1.721.333a2.272 2.272 0 0 0-.945.945C3.116 5.686 3 6.09 3 7.205v10.59c0 1.114.116 1.519.334 1.926.218.407.538.727.945.945.407.218.811.334 1.926.334h11.59c1.114 0 1.519-.116 1.926-.334.407-.218.727-.538.945-.945.218-.407.334-.811.334-1.926V7.205c0-1.115-.116-1.519-.334-1.926a2.272 2.272 0 0 0-.945-.945C19.34 4.13 18.961 4.015 18 4V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-1-1zM5 9v8.795c0 .427.019.694.049.849.012.06.017.074.049.134a.275.275 0 0 0 .124.125c.06.031.073.036.134.048.155.03.422.049.849.049h11.59c.427 0 .694-.019.849-.049a.353.353 0 0 0 .134-.049.275.275 0 0 0 .125-.124.353.353 0 0 0 .048-.134c.03-.155.049-.422.049-.849L19.004 9H5zm8.75 4a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5z"
  //         // fill="#000000"
  //       />
  //     </svg>
  //   ),
  //   description: "Generate a QR code for plain text",
  // },
  // {
  //   name: "twiter",
  //   icon: (
  //     <svg
  //       width="24"
  //       height="24"
  //       viewBox="0 -2 20 20"
  //       version="1.1"
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="currentColor"
  //       // xmlns:xlink="http://www.w3.org/1999/xlink"
  //     >
  //       <g
  //         id="Page-1"
  //         stroke="none"
  //         stroke-width="1"
  //         fill="currentColor"
  //         fill-rule="evenodd"
  //       >
  //         <g
  //           id="Dribbble-Light-Preview"
  //           transform="translate(-60.000000, -7521.000000)"
  //           fill="currentColor"
  //         >
  //           <g id="icons" transform="translate(56.000000, 160.000000)">
  //             <path
  //               d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705"
  //               id="twitter-[#154]"
  //             ></path>
  //           </g>
  //         </g>
  //       </g>
  //     </svg>
  //   ),
  //   description: "Generate a QR code for plain text",
  // },
  // {
  //   name: "location",
  //   icon: (
  //     <svg
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="white"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
  //         stroke="#000000"
  //         stroke-width="2"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //       <path
  //         d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
  //         stroke="#000000"
  //         stroke-width="2"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //     </svg>
  //   ),
  //   description: "Generate a QR code for plain text",
  // },
  {
    name: "text",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 15 15"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H7.5C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H10.5C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
        />
      </svg>
    ),
    description: "Generate a QR code for plain text",
  },
];

export { MODES, FILE_FORMAT, SIZE };
