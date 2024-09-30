import ArticleRow from "./ArticleRow";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingArticles = () => {
    // states & hooks
    const axiosSecure = useAxiosSecure();
    const { data: pendingArticles = [], isLoading, refetch } = useQuery({
        queryKey: ["pendingArticles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/articles")
            return res.data;
        }
    })

    // handle pending, approve, cancel status
    const handleUpdate = (id, update) => {
        const status = update;
        axiosSecure.put(`/articles/${id}`, { status })
            .then(res => {
                const data = res.data
                console.log("status", data);
                if (data.modifiedCount > 0 && status === "approved") {
                    Swal.fire({
                        position: "top-end",
                        // icon: `${status === "approved" ? "success" : "error"}`,
                        icon: "success",
                        title: `The article is approved by the admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })

    }

    // handle delete
    const handleDelete = (id) => {
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
                axiosSecure.delete(`/articles/${id}`)
                    .then(res => {
                        const data = res.data;
                        console.log(data);
                        if (data.deletedCount > 0) {
                            let timerInterval;
                            Swal.fire({
                                title: "Deletion in process...!",
                                html: "Article will be deleted <b></b> milliseconds.",
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
                                }
                            });
                            refetch();
                        }


                    })
            }
        });
    }

    // checking if loading
    if (isLoading) {
        return <div className="flex justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
            <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
        </div>
    }


    return (
        <>
            <div>
                <h3 className="text-center pt-4 text-gray-400 text-4xl font-semibold">Manage Articles</h3>
            </div>
            <div className="overflow-x-auto bg-green-50 pt-4 mb-5 md:mb-0">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="hidden md:table-cell">#</th>
                            <th>Title & image</th>
                            <th className="hidden md:table-cell">Publisher name</th>
                            <th className="hidden md:table-cell">Premium</th>
                            <th>Status</th>
                            <th className="hidden md:table-cell">View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            pendingArticles?.map((data, index) => <ArticleRow
                                key={data._id}
                                data={data}
                                index={index}
                                handleUpdate={handleUpdate}
                                handleDelete={handleDelete}
                                refetch={refetch}
                            >
                            </ArticleRow>)
                        }
                    </tbody>

                </table>
            </div>
        </>
    );
};

export default PendingArticles;