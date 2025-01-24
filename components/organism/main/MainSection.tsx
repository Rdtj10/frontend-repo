"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData, updateUserData } from "@/store/action";
import { setRefresher } from "@/store/reducers";
import { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";
import { User } from "@/apis/interface/user";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";

const MainSection = () => {
  // REQUIREMENT
  const dispatch = useDispatch<AppDispatch>();
  const [loadingRows, setLoadingRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [editMode, setEditMode] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const usersData = useSelector((state: RootState) => state.user.data);
  const error = useSelector((state: RootState) => state.user.error);
  const refresher = useSelector((state: RootState) => state.user.refresher);
  const [dataFetched, setDataFetched] = useState(false);

  // HANDLER
  const handleFetch = async () => {
    setLoadingRows((prev) => ({ ...prev, fetching: true }));
    try {
      await dispatch(fetchUsersData()).unwrap();
      setDataFetched(true);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoadingRows((prev) => ({ ...prev, fetching: false }));
    }
  };

  const handleUpdate = async (documentId: string) => {
    setLoadingRows((prev) => ({ ...prev, [documentId]: true }));
    try {
      await dispatch(updateUserData({ data: formData, documentId })).unwrap();
      dispatch(setRefresher());
      setEditMode(null);
    } catch (err) {
      console.error("Failed to update user:", err);
    } finally {
      setLoadingRows((prev) => ({ ...prev, [documentId]: false }));
    }
  };

  const handleEdit = (user: User) => {
    setEditMode(user.id);
    setFormData({ name: user.name, email: user.email });
  };

  //data refresher
  useEffect(() => {
    const timer = setTimeout(() => {
      if (dataFetched) {
        dispatch(fetchUsersData());
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch, refresher, dataFetched]);

  // VIEW
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full lg:w-fit h-full lg:h-fit p-4 lg:p-16 lg:rounded-xl lg:shadow-xl">
      <div>
        <Typography align="center" variant="h4">
          Welcome to Main Page
        </Typography>
        <p className="text-center">
          Click the button below to fetch all user data
        </p>
      </div>

      <Button
        className="w-fit normal-case"
        variant="contained"
        color="primary"
        onClick={handleFetch}
        disabled={loadingRows["fetching"]}
        size="small"
      >
        {loadingRows["fetching"] ? (
          <CircularProgress size={24} />
        ) : (
          "Fetch User Data"
        )}
      </Button>

      {error && (
        <div className="flex flex-col gap-2">
          <Typography color="error" variant="body1" align="center">
            {error}
          </Typography>
          <Typography variant="body1" align="center">
            Please{" "}
            <Link href="/auth/login" className="text-blue-400">
              login
            </Link>{" "}
            first
          </Typography>
        </div>
      )}

      {usersData.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {editMode === user.id ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Edit Name"
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode === user.id ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Edit Email"
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode === user.id ? (
                      <div className="flex flex-row gap-4">
                        <Button
                          className="w-fit normal-case"
                          variant="contained"
                          color="success"
                          disabled={loadingRows[user.id]}
                          size="small"
                          onClick={() => handleUpdate(user.id)}
                        >
                          {loadingRows[user.id] ? (
                            <CircularProgress size={24} />
                          ) : (
                            "Update"
                          )}
                        </Button>
                        <Button
                          className="w-fit normal-case"
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => setEditMode(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-fit"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(user)}
                      >
                        Update Data
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainSection;
