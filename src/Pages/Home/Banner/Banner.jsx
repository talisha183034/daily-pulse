import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SingleArticle from "../../AllArticles/SingleArticle/SingleArticle"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';



const Banner = () => {
    // states and loaders
    const axiosPublic = useAxiosPublic();
    const isBanner = true;

    // tanstack query
    const { data: bannerData = [], isLoading } = useQuery({
        queryKey: ["bannerData"],
        queryFn: async () => {
            const res = await axiosPublic.get("/articlesByView")
            return res.data;
        }
    })

    // checking loading state of banner data
    if (isLoading) {
        return <div className="flex bg-emerald-50 justify-center mt-28 mb-28 lg:mt-40 lg:mb-40">
            <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
        </div>
    }


    return (
        <section>
            <div className="hidden lg:flex justify-center space-y-4 text-center py-0 lg:py-10">
                <h3 className="text-2xl font-bold text-gray-400 sm:text-5xl">Most viewed articles</h3>
            </div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {
                    bannerData?.map(data =>
                        <SwiperSlide
                            key={data._id}>
                            <SingleArticle
                                isBanner={isBanner}
                                data={data}>
                            </SingleArticle>
                        </SwiperSlide>).slice(0, 6)
                }

            </Swiper>
        </section>
    );
};

export default Banner;