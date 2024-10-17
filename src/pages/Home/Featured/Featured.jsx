import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-10 my-20">
            <SectionTitle
            heading="From Our Menu"
            subHeading={"Check it out"}
            ></SectionTitle>
            <div className="md:flex justify-center items-center py-20 px-36 bg-slate-500 bg-opacity-60">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Apr,4,2001</p>
                    <p className="uppercase">Where can I get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quam repellat ut totam expedita voluptate, dolore nihil dolorem aspernatur, eligendi pariatur rem. Numquam fugiat, architecto et, in, officiis repellat adipisci sapiente quos aspernatur nihil nobis! Voluptatibus, vitae magni, unde, non voluptatum accusamus tempora similique esse perspiciatis alias et corrupti numquam.</p>
                    <button className="btn btn-outline text-white border-0 border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;