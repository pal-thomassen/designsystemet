import type { HTMLProps } from 'react';
import React from 'react';
import cn from 'classnames';

import classes from './TableCell.module.css';
import type { SortHandler, Variant, SortDirection } from './utils';
import { useTableRowTypeContext } from './utils';
import { SortIcon } from './SortIcon';

export interface TableCellProps
  extends Omit<HTMLProps<HTMLTableCellElement>, 'onChange'> {
  children?: React.ReactNode;
  variant?: string;
  onChange?: SortHandler;
  sortDirection?: SortDirection;
  radiobutton?: boolean;
}

export function TableCell({
  children,
  variant,
  onChange,
  sortDirection = 'notSortable',
  className,
  radiobutton = false, // Todo: This only sets a class, but relies on the consumer to provide the actual radiobutton. This should either be handled entirely within this component, or we should give this property a more generic name.
  ...tableCellProps
}: TableCellProps) {
  const { variantStandard } = useTableRowTypeContext();

  const isVariant = (checkIf: Variant): boolean => {
    if (variant === undefined) {
      return variantStandard === checkIf;
    }
    return variant === checkIf;
  };

  const handleChange = () => {
    if (
      onChange != undefined &&
      sortDirection != undefined &&
      sortDirection != 'notSortable'
    ) {
      // Todo: Here we rely on the consumer to sort the rows based on the sortDirection. We should handle this within the component, with an optional possibility to pass in a custom compare function.
      onChange({
        next: sortDirection === 'desc' ? 'asc' : 'desc',
        previous: sortDirection,
      });
    }
  };

  return (
    <>
      {isVariant('header') && (
        <th
          {...tableCellProps}
          className={cn(
            radiobutton
              ? classes.headerTableCellRadiobutton
              : classes.headerTableCell,
            className,
          )}
          aria-sort={
            sortDirection === 'asc'
              ? 'ascending'
              : sortDirection === 'desc'
              ? 'descending'
              : 'none'
          }
        >
          <div
            className={
              sortDirection != 'notSortable'
                ? classes.containerSortable
                : classes.container
            }
            onClick={() => handleChange()}
            onKeyUp={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleChange();
              }
            }}
            role={sortDirection != 'notSortable' ? 'button' : undefined}
            tabIndex={sortDirection != 'notSortable' ? 0 : undefined}
          >
            <div className={classes.input}>{children}</div>
            {sortDirection != 'notSortable' && (
              <SortIcon
                aria-label='Sortering' // Todo: Texts should be provided by the consumer
                data-testid='sort-icon'
                className={cn(classes['icon'], {
                  [classes.iconAsc]: sortDirection === 'asc',
                  [classes.iconDesc]: sortDirection === 'desc',
                })}
              />
            )}
          </div>
        </th>
      )}
      {isVariant('body') && (
        <td
          {...tableCellProps}
          className={cn(
            radiobutton
              ? classes.bodyTableCellRadiobutton
              : classes.bodyTableCell,
            className,
          )}
        >
          <div className={radiobutton ? classes.radioButton : classes.input}>
            {children}
          </div>
        </td>
      )}
      {isVariant('footer') && (
        <td
          {...tableCellProps}
          className={className}
        >
          <div className={classes.input}>{children}</div>
        </td>
      )}
    </>
  );
}