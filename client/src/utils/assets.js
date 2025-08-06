import DashboardIcon from "@/assets/assets/icons/dashboard.svg";
import DocumentsIcon from "@/assets/assets/icons/documents.svg";
import ImagesIcon from "@/assets/assets/icons/images.svg";
import MediaIcon from "@/assets/assets/icons/video.svg";
import OthersIcon from "@/assets/assets/icons/others.svg";

import EditIcon from "@/assets/assets/icons/edit.svg";
import InfoIcon from "@/assets/assets/icons/info.svg";
import ShareIcon from "@/assets/assets/icons/share.svg";
import DownloadIcon from "@/assets/assets/icons/download.svg";
import DeleteIcon from "@/assets/assets/icons/delete.svg";

export const navItems = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    url: "/dashboard",
  },
  {
    name: "Documents",
    icon: DocumentsIcon,
    url: "/dashboard/documents",
  },
  {
    name: "Images",
    icon: ImagesIcon,
    url: "/dashboard/images",
  },
  {
    name: "Media",
    icon: MediaIcon,
    url: "/dashboard/media",
  },
  {
    name: "Others",
    icon: OthersIcon,
    url: "/dashboard/others",
  },
];
export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: EditIcon,
    value: "rename",
  },
  {
    label: "Details",
    icon: InfoIcon,
    value: "details",
  },
  {
    label: "Share",
    icon: ShareIcon,
    value: "share",
  },
  {
    label: "Download",
    icon: DownloadIcon,
    value: "download",
  },
  {
    label: "Delete",
    icon: DeleteIcon,
    value: "delete",
  },
];

export const avatarPlaceholderUrl =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB  