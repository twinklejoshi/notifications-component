/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Notifications } from './Notifications';
import { useAllCustomerUnreadRecords } from './services';

jest.mock('./services');

const mockNotifications = [
  {
    recordId: 1,
    title: 'Notification 1',
    description: 'Description 1',
    isRead: false,
    metrics: 'metric-1',
    type: 'info'
  },
  {
    recordId: 2,
    title: 'Notification 2',
    description: 'Description 2',
    isRead: false,
    metrics: 'metric-2',
    type: 'info'
  },
  {
    recordId: 3,
    title: 'Notification 3',
    description: 'Description 3',
    isRead: false,
    metrics: 'metric-3',
    type: 'info'
  },
  {
    recordId: 4,
    title: 'Notification 4',
    description: 'Description 4',
    isRead: false,
    metrics: 'metric-4',
    type: 'info'
  },
  {
    recordId: 5,
    title: 'Notification 5',
    description: 'Description 5',
    isRead: false,
    metrics: 'metric-5',
    type: 'info'
  },
  {
    recordId: 6,
    title: 'Notification 6',
    description: 'Description 6',
    isRead: false,
    metrics: 'metric-6',
    type: 'info'
  },
  {
    recordId: 7,
    title: 'Notification 7',
    description: 'Description 7',
    isRead: false,
    metrics: 'metric-7',
    type: 'info'
  }
];

describe('Notifications Component', () => {
  beforeEach(() => {
    (useAllCustomerUnreadRecords as jest.Mock).mockReturnValue({
      data: mockNotifications,
      isLoading: false,
      error: null
    });
     // Mock window.open
     global.open = jest.fn();
  });

  it('should display a loading message when loading', () => {
    (useAllCustomerUnreadRecords as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null
    });
    render(<Notifications />);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('should display no notifications message when there are no notifications', () => {
    (useAllCustomerUnreadRecords as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    });
    render(<Notifications />);

    expect(screen.getByText(/No new notifications/)).toBeInTheDocument();
  });

  it('should display the notifications', () => {
    render(<Notifications />);
    mockNotifications.slice(0,4).forEach(notification => {
      expect(screen.getByText(notification.title)).toBeInTheDocument();
      expect(screen.getByText(notification.description)).toBeInTheDocument();
    });
  });

  it('should mark a notification as read when clicked', async () => {
    jest.useFakeTimers();
    render(<Notifications />);

    const firstNotification = screen.getByText('Notification 1').parentElement?.parentElement!;
    fireEvent.click(firstNotification);
    await waitFor(() => {
        expect(firstNotification).toHaveClass('fade-out');
      });
    fireEvent.animationEnd(firstNotification);

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    await waitFor(() => {
        expect(screen.queryByText('Notification 1')).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it('should open a new tab with the correct URL when a notification is clicked', () => {
    render(<Notifications />);

    const firstNotification = screen.getByText('Notification 1');
    fireEvent.click(firstNotification);

    expect(global.open).toHaveBeenCalledWith(
      `${window.location.origin}/usage-metrics/metric-1`,
      '_blank'
    );
  });

  it('should load more notifications when "See More" is clicked', () => {
    render(<Notifications />);

    const seeMoreButton = screen.getByText(/See More/);
    fireEvent.click(seeMoreButton);

    mockNotifications.slice(4, 8).forEach(notification => {
      expect(screen.getByText(notification.title)).toBeInTheDocument();
      expect(screen.getByText(notification.description)).toBeInTheDocument();
    });
  });

  it('should mark all notifications as read when "Mark all as read" is clicked', async () => {
    jest.useFakeTimers();
    render(<Notifications />);

    const markAllAsReadButton = screen.getByText(/Mark all as read/);
    fireEvent.click(markAllAsReadButton);
  // Fast-forward until all timers have been executed
  jest.runAllTimers();

    await waitFor(() => {
      expect(screen.queryByText('Notification 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Notification 2')).not.toBeInTheDocument();
    });
    jest.useRealTimers();
  });
});
