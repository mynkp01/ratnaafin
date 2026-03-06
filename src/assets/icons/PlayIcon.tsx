const PlayIcon = ({ ...props }) => (
  <div
    className={`relative rounded-full text-white size-6 min-h-6 min-w-6 p-8 flex items-center justify-center ${props.className || ""}`}
    style={{
      backgroundColor: "rgba(84,	84,	84, 0.3)",
    }}
  >
    <div
      style={{
        borderRadius: "100%",
        backdropFilter: "blur(10px)",
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: -1,
      }}
    />
    <svg width={24} height={25} viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} className={`${props.className || ""} p-0`}>
      <path
        d="M0.304688 10.9985V6.55851C0.304688 0.82851 4.35469 -1.48149 9.30469 1.36851L13.1447 3.58851L16.9847 5.80851C21.9347 8.65851 21.9347 13.3385 16.9847 16.1885L13.1447 18.4085L9.30469 20.6285C4.35469 23.4785 0.304688 21.1385 0.304688 15.4385V10.9985Z"
        fill="white"
      />
    </svg>
  </div>
);
export default PlayIcon;
