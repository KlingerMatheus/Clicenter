'use client';

import React from 'react';
import { Drawer, Box, useTheme } from '@mui/material';
import { motion, PanInfo } from 'framer-motion';
import SidebarContent, { SidebarContentProps } from './SidebarContent';

export interface MobileSidebarProps
  extends Omit<SidebarContentProps, 'isMobile' | 'isExpanded'> {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  ...contentProps
}) => {
  const theme = useTheme();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;

    if (offset.y > 100 || velocity.y > 500) {
      onClose();
    }
  };

  return (
    <Drawer
      variant="temporary"
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          height: 'auto',
          maxHeight: '60vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderBottom: 'none',
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
          overflow: 'visible',
          padding: 0,
        },
      }}
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing',
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            position: 'relative',
          }}
        >
          <motion.div
            whileDrag={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Box
              sx={{
                width: 40,
                height: 3,
                backgroundColor: theme.palette.divider,
                borderRadius: 2,
              }}
            />
          </motion.div>
        </Box>

        <SidebarContent {...contentProps} isMobile={true} isExpanded={true} />
      </motion.div>
    </Drawer>
  );
};

export default MobileSidebar;
