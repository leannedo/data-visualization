const dataSanitizer = (data) => {
    const { data1, data2 } = data;
    const { elem: elem1 } = data1.value;
    const { elem: elem2 } = data2.value;

    const filteredData1 = elem1.filter(e => e.f === 0).map(e => e.a);
    const filteredData2 = elem2.filter(e => e.f === 0).map(e => e.a);

    return { filteredData1, filteredData2 };
};

export default dataSanitizer;
