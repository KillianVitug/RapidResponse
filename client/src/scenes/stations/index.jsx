import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetStationsQuery } from "state/api";

const Station = ({
  _id,
  name,
  description,
  category,
  rating,
  location,
  stat
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>

      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Location {location}</Typography>
          <Typography>
            Yearly Reports This Year: {stat.yearlyReportsTotal}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};


const Stations = () => {
  const { data, isLoading } = useGetStationsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return <Box>
    <Box m="1.5rem 2.5rem"></Box>
    <Header title="STATIONS" subtitle="List of stations in Angeles City" />
    {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}/* NEED FIXING .MAP */
        >
          
          {data.map(
            ({
              _id,
              name,
              description,
              category,
              rating,
              location,
              stat,
            }) => (
              <Station
                key={_id}
                _id={_id}
                name={name}
                description={description}
                category={category}
                rating={rating}
                location={location}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
  </Box>
}

export default Stations;