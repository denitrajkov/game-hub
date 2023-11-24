import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const GameCardSkeleton = () => {
  const [skeletonWidth, setSkeletonWidth] = useState("500px");

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 768) {
        setSkeletonWidth("100%");
      } else {
        setSkeletonWidth("500px");
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <Card>
      <Skeleton width={skeletonWidth} height="200px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;
