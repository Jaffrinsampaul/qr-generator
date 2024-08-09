const RenderSVG = ({icons})=>{
    const styles = {
        svg: {
          display: 'inline-block',
          verticalAlign: 'middle',
        },
        path: {
           fill: "#fff",
        },
      };
    return(
        <svg style={styles.svg} width={"20px"} height={"20px"} viewBox="0 0 1024 1024">
            <path style={styles.path} d={icons}/>
            {/* icons */}
        </svg>
    )
};


export default RenderSVG