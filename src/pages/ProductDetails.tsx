import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">Product Details</h2>
      <p>Product ID: {id}</p>
    </div>
  );
}
