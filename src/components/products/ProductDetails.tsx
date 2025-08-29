import { useProductById } from "@/hooks/useProducts";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, isError } = useProductById(Number(id));

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTitle>Product not found</AlertTitle>
          <AlertDescription>{(error as Error).message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link to="/">
        <Button variant="outline" className="mb-4  cursor-pointer">
          ⬅ Back
        </Button>
      </Link>
      <Card className="hover:shadow-lg transition  cursor-pointer">
        <CardHeader>
          <img
            src={data?.thumbnail}
            alt={data?.title}
            className="h-64 object-cover rounded-md"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-2">{data?.title}</CardTitle>
          <CardDescription className="mb-4">
            {data?.description}
          </CardDescription>
          <p className="text-lg font-semibold">Price: ${data?.price}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
