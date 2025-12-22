function Model(props) {
    console.log(props);
    const {
        HeaderComponent,
        FooterComponent,
        children
    } = props;
    return (
        <div style={styles.overlay}>
            <div style={styles.model}>
                {HeaderComponent && <HeaderComponent />}
                <div style={styles.content}>
                    {/* 这个是组件闭合开关中间的部分，提升组件的定制性 */}
                    {/* 如果要提供定制能力 */}
                    {children}
                </div>
                {FooterComponent && <FooterComponent />}
            </div>
        </div>
    )
}

// CSS in JS
const styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    model: {
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '8px',
        width: '400px'
    },
    content: {
        margin: '1rem 0'
    }
}

export default Model;