import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataMenu_head, data_products } from '../../redux/actions/actions';
import '../../assets/css/component/listProduct/listProducts.scss';
import Foot from '../../component/foot/foot';
import Header from '../../component/head/head';
import Listproducts from './listProducts';
import { HIDE_NAVBAR, SHOW_NAVBAR } from '../../assets/js/util/util';

const ProductList = () => {
    const dispatch = useDispatch();
    const dataFilter = useSelector(state => state.menuReducer.menuData);
    let dataInput = useSelector(state => state.dataReducer.productData);
    const close = ['close-filter', 'innner-close', '.filter-sidebar', 'active-filter-sidebar'];
    const show = ['bars-filter', '.filter-sidebar', 'active-filter-sidebar'];
    const [data_filter, setdata_filter] = useState(dataInput);

    //CHECK BOX PRODUCTS
    const active_checkbox = () => {
        document.addEventListener('click', (e) => {
            const checkbox = document.getElementsByClassName('checkBox-cate');
            let data_checkbox = [];
            if (e.target.classList.contains('checkBox-cate')) {
                for (let i = 0; i < checkbox.length; i++) {
                    if (checkbox[i].checked == true) {
                        data_checkbox.push(...dataInput.filter(item => item.category_child == checkbox[i].value));
                    }
                }
            }
            setdata_filter(data_checkbox);
        })
    }

    const sort_data = () => {

        const sort_select = document.getElementById('sort');
        console.log(sort_select.value);
        if (sort_select.value == 'default') {
            active_checkbox();
        } else if (sort_select.value == 'alphabeta') {
            setdata_filter(data_filter.sort());
        } else if (sort_select.value == 'reverses') {
            setdata_filter(data_filter.sort());
            setdata_filter(data_filter.reverse());
        }
    }

    useEffect(() => {
        dispatch(dataMenu_head());
        dispatch(data_products());
        active_checkbox();
    }, [])
    // useEffect(() => {
    //     sort_data();
    // })

    return (
        <div className="content_page list-products">
            <Header />

            <div className="content">
                <div className="banner">
                </div>
                <h4>C??C S???N PH???M</h4>
                <div className="inner_content row m-auto">
                    {/* filter desktop  */}
                    <div className="filter-products col-3">
                        <div className="inner-filter">
                            <ul>
                                <li><h3>Lo???i s??ch</h3></li>
                                {
                                    dataFilter != undefined ? (dataFilter.map((item, index) => (
                                        <li>
                                            <li className="tag">
                                                {
                                                    item.display_name
                                                }
                                            </li>
                                            <ul >
                                                {
                                                    item.dropdown ? (
                                                        item.dropdown.map((el) =>
                                                            <li> <input type="checkbox" name={`group-${index}`} className="checkBox-cate"
                                                                value={el.category_child} onClick={active_checkbox} /> {el.display_name}</li>
                                                        )
                                                    ) : []
                                                }
                                            </ul>
                                        </li>

                                    ))) : []
                                }
                            </ul>
                        </div>
                    </div>
                    {/* filter desktop  */}
                    {/* filter mobile */}
                    <div className="filter-sidebar active-filter-sidebar">
                        <div className="inner-filter-sidebar">
                            <ul>
                                <li className="tag"><h3>B??? l???c s??ch</h3></li>
                                {
                                    dataFilter != undefined ? (dataFilter.map((item, index) => (
                                        <li>
                                            <li className="tag">
                                                {
                                                    item.display_name
                                                }
                                            </li>
                                            <ul >
                                                {
                                                    item.dropdown ? (

                                                        item.dropdown.map((el) =>
                                                            <li> <input type="checkbox" name={`group-${index}`} /> {el.display_name}</li>
                                                        )
                                                    ) : []
                                                }
                                            </ul>
                                        </li>

                                    ))) : []
                                }

                            </ul>
                            <div className="close-filter" onClick={HIDE_NAVBAR(...close)}>
                                <i class="fa fa-close innner-close" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    {/* filter mobile */}
                    <div className="list col-12 col-xl-9">
                        <div className="sort row">
                            <div className="sort-text col-6" onClick={SHOW_NAVBAR(...show)}>
                                <i class="fa fa-bars bars-filter" aria-hidden="true"></i>
                                S???n ph???m</div>
                            <div className="sort-cate col-6">
                                <span> S???p x???p theo &nbsp;</span>
                                <select id="sort" onClick={sort_data}>
                                    <option value="default" >M???c ?????nh</option>
                                    <option value="alphabeta" >T??? A-Z</option>
                                    <option value="reverses" >T??? Z-A</option>
                                    <option value="dec" >R??? nh???t</option>
                                    <option value="asc" >?????t nh???t</option>
                                    <option value="newest" >M???i nh???t</option>
                                </select>
                            </div>
                        </div>
                        {
                            data_filter == '' ? (
                                <Listproducts
                                    data={dataInput != undefined ? dataInput : []} />) :
                                (
                                    <Listproducts
                                        data={data_filter != undefined ? data_filter : []} />
                                )
                        }


                    </div>

                </div>
            </div>
            <Foot />
        </div >

    );
}

export default ProductList;
