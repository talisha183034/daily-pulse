import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PublisherRow from "./PublisherRow";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Publishers = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: allPublishers = [], isLoading, refetch } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/publishers")
            return res.data;
        }
    })


    // handle delete
    const handleDelete = (id, publisher) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/publishers/${id}`)
                    .then(res => {
                        const data = res.data;
                        console.log(data);
                        let timerInterval;
                        Swal.fire({
                            title: "Deletion in process...!",
                            html: `${publisher} will be deleted in <b></b> milliseconds.`,
                            timer: 1000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                                const timer = Swal.getPopup().querySelector("b");
                                timerInterval = setInterval(() => {
                                    timer.textContent = `${Swal.getTimerLeft()}`;
                                }, 100);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                refetch();
                            }
                        });

                    })
            }
        });


    }

    // if loading true
    if (isLoading) {
        return <div className="flex justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
            <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
        </div>
    }

    return (
        <>
            <div>
                <h3 className="text-center pt-4 text-gray-400 text-4xl font-semibold">All Publishers</h3>
            </div>
            <div className="overflow-x-auto bg-green-50 pt-4 mb-5 md:mb-0">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="hidden md:table-cell">#</th>
                            <th>Image</th>
                            <th className="hidden md:table-cell">Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            allPublishers?.map((data, index) => <PublisherRow
                                key={data._id}
                                data={data}
                                index={index}
                                handleDelete={handleDelete}
                            >
                            </PublisherRow>)
                        }
                    </tbody>

                </table>
            </div>
        </>
    );
};

export default Publishers;