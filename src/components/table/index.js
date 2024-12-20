import React from "react";
import { Td, Th } from "../typography/styled";
import { BaseButton } from "../../components/buttons/index";
import { SelectFieldWrapper } from "../formfields/select/styled";
import { Row } from "../flex/styled";
import { BaseInputWrapper } from "../formfields/input/styled";

export const Table = ({
  categories,
  columnTitles,
  onSelectOption,
  rowItems,
  uniqueCurrencies,
  actions,
  handleStatusChange,
  location,
  role,
  performAction,
  exportToExcel,
  orgNames,
  collections,
  status,
  postersId,
  handleFilterValueChange
}) => {
  return (
    <React.Fragment>
      <Row
        style={{ justifyContent: "flex-end", flexWrap: "wrap-reverse", gap: "0.5rem", marginBottom: "0.5rem" }}
      >
        <Row style={{ gap: "0.5rem", flexWrap: "wrap-reverse", overflow: "hidden" }}>
          {location === "dataOverviewArea" && (
            <React.Fragment>
              {(role === "SuperAdmin") && (
                <SelectFieldWrapper
                  name="orgName"
                  onChange={handleFilterValueChange}
                >
                  <option value="">Filter by MDA/State</option>
                  {orgNames?.map((option, key) => (
                    <option key={key} value={option}>
                      {option}
                    </option>
                  ))}
                </SelectFieldWrapper>
              )}
              <SelectFieldWrapper
                name="collection"
                onChange={handleFilterValueChange}
              >
                <option value="">Filter by Collection</option>
                {collections?.map((collection, key) => (
                  <option key={key} value={collection}>
                    {collection}
                  </option>
                ))}
              </SelectFieldWrapper>
              <SelectFieldWrapper
                name="status"
                onChange={handleFilterValueChange}
              >
                <option value="">Filter by Status</option>
                {status?.map((option, key) => (
                  <option key={key} value={option}>
                    {option}
                  </option>
                ))}
              </SelectFieldWrapper>
            </React.Fragment>
          )}
          {location === "projectsTableArea" && (
            <SelectFieldWrapper
              name="status"
              onChange={handleFilterValueChange}
            >
              <option value="">Filter by Status</option>
              {status?.map((option, key) => (
                <option key={key} value={option}>
                  {option}
                </option>
              ))}
            </SelectFieldWrapper>
          )}
          {location === "detailsArea" && (
            <React.Fragment>
              <BaseInputWrapper
                type="date"
                name="startDate"
                onChange={handleFilterValueChange}
              />
              {/* <BaseInputWrapper
                type="date"
                name="endDate"
                onChange={handleFilterValueChange}
              /> */}
              <SelectFieldWrapper
                name="posterEmail"
                onChange={handleFilterValueChange}
              >
                <option value="">Filter by Disburser</option>
                {postersId?.map((option, key) => (
                  <option key={key} value={option}>
                    {option}
                  </option>
                ))}
              </SelectFieldWrapper>
              <SelectFieldWrapper
                name="status"
                onChange={handleFilterValueChange}
              >
                <option value="">Filter by Status</option>
                {status?.map((option, key) => (
                  <option key={key} value={option}>
                    {option}
                  </option>
                ))}
              </SelectFieldWrapper>
            </React.Fragment>
          )}
        </Row>
        <div className="exportButton">
          <BaseButton width={"fit-content"} onClick={exportToExcel}>
            Export to Excel
          </BaseButton>
        </div>
      </Row>
      <div className="tableWrapper">
        <table>
          <thead>
            {location === "dataOverviewArea" ||
              location === "projectsTableArea" ||
              location === "archivesArea" ? (
              <React.Fragment>
                <tr>
                  {categories?.map((category, index) => (
                    <Th
                      key={index}
                      colSpan={
                        category === "Fundings" ||
                          category === "Allocation" ||
                          category === "Funding Balance" ||
                          category === "Disbursement"
                          ? uniqueCurrencies?.length
                          : 1
                      }
                      style={{
                        textAlign:
                          category === "Fundings" ||
                            category === "Allocation" ||
                            category === "Funding Balance" ||
                            category === "Disbursement"
                            ? "center"
                            : "left",
                        border: "1px solid rgba(33, 63, 125, 0.10)",
                        borderLeft:
                          category === "Fundings" ||
                            category === "Allocation" ||
                            category === "Funding Balance" ||
                            category === "Disbursement"
                            ? "5px solid grey"
                            : "1px solid rgba(33, 63, 125, 0.10)",
                        borderRight:
                          category === "Fundings" ||
                            category === "Allocation" ||
                            category === "Funding Balance" ||
                            category === "Disbursement"
                            ? "5px solid grey"
                            : "1px solid rgba(33, 63, 125, 0.10)",
                      }}
                    >
                      {category}
                    </Th>
                  ))}
                </tr>
                <tr>
                  {location === "dataOverviewArea" ||
                    location === "archivesArea" ? (
                    <React.Fragment>
                      {/* Empty cell for "Project Title" and "MDA" */}
                      <Th colSpan={role === "SuperAdmin" ? 2 : 1}></Th>
                      {["Allocation", "Disbursement", "Funding Balance"].map(
                        (category) =>
                          uniqueCurrencies?.map((currency, index) => (
                            <Th
                              key={index}
                              style={{
                                textAlign: "center",
                                border: "1px solid rgba(33, 63, 125, 0.10)",
                                borderLeft:
                                  index === 0
                                    ? "5px solid grey"
                                    : "1px solid rgba(33, 63, 125, 0.10)",
                                borderRight:
                                  index === uniqueCurrencies.length - 1
                                    ? "5px solid grey"
                                    : "1px solid rgba(33, 63, 125, 0.10)",
                              }}
                            >
                              {currency}
                            </Th>
                          ))
                      )}
                      {/* Empty cell for "Project Status" */}
                      <Th></Th>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {/* Empty cell for "Project Title" */}
                      <Th></Th>
                      {uniqueCurrencies?.map((currency, index) => (
                        <Th
                          key={index}
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {currency}
                        </Th>
                      ))}
                      {/* Empty cell for "Project Status" */}
                      <Th></Th>
                    </React.Fragment>
                  )}
                </tr>
              </React.Fragment>
            ) : (
              // handle the disbursements area
              <tr>
                {columnTitles?.map((columnTitle, index) => (
                  <Th key={index}>{columnTitle}</Th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {rowItems?.map((rowItem, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={(event) =>
                  onSelectOption(rowItem.organization, rowItem.projectId, event)
                }
              >
                <Td>
                  {rowItem.title ||
                    rowItem.dateDisbursed ||
                    rowItem.projectTitle ||
                    ""}
                </Td>
                {location === "detailsArea" && (
                  <React.Fragment>
                    <Td>{rowItem.creator}</Td>
                    <Td>{rowItem.purpose}</Td>
                    {uniqueCurrencies.length > 1 ? (
                      uniqueCurrencies.map((_, index) => (
                        <Td key={index}>
                          {rowItem.currencySymbol}
                          {new Intl.NumberFormat().format(
                            rowItem.amountDisbursed
                          )}
                        </Td>
                      ))
                    ) : (
                      <Td>
                        {rowItem.currencySymbol}
                        {new Intl.NumberFormat().format(
                          rowItem.amountDisbursed
                        )}
                      </Td>
                    )}
                    <Td>{rowItem?.attachments[0] || ""}</Td>
                    <Td>{rowItem?.disbursementStatus || ""}</Td>
                    {role === "Individual" && (
                      <Td
                        style={{ color: "red" }}
                        onClick={(e) =>
                          performAction(e, rowItem.disbursementId)
                        }
                      >
                        Delete
                      </Td>
                    )}
                  </React.Fragment>
                )}
                {location === "projectsTableArea" && (
                  <React.Fragment>
                    {uniqueCurrencies?.map((currency, index) => {
                      const funding = rowItem.fundings
                        .filter((f) => f.currencyName === currency)
                        .reduce((total, funding) => total + funding.amount, 0);
                      return (
                        <Td
                          key={index}
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {funding
                            ? new Intl.NumberFormat().format(funding)
                            : ""}
                        </Td>
                      );
                    })}
                    <Td>{rowItem.status || ""}</Td>
                  </React.Fragment>
                )}
                {(location === "dataOverviewArea" ||
                  location === "archivesArea") && (
                    <React.Fragment>
                      {role === "SuperAdmin" && <Td>{rowItem.organization}</Td>}
                      {rowItem.totalAllocations.map((allocation, index) => (
                        <Td
                          key={index}
                          style={{
                            textAlign: "center",
                            borderLeft:
                              index === 0
                                ? "5px solid grey"
                                : "1px solid rgba(33, 63, 125, 0.10)",
                            borderRight:
                              index === rowItem.totalAllocations.length - 1
                                ? "5px solid grey"
                                : "1px solid rgba(33, 63, 125, 0.10)",
                          }}
                        >
                          {new Intl.NumberFormat().format(
                            allocation.amountAllocated
                          ) || ""}
                        </Td>
                      ))}
                      {rowItem.totalAllocations.map((allocation, index) => (
                        <Td key={index} style={{ textAlign: "center" }}>
                          {new Intl.NumberFormat().format(
                            allocation.amountDisbursed
                          ) || ""}
                        </Td>
                      ))}
                      {rowItem.totalAllocations.map((allocation, index) => (
                        <Td
                          key={index}
                          style={{
                            textAlign: "center",
                            borderLeft:
                              index === 0
                                ? "5px solid grey"
                                : "1px solid rgba(33, 63, 125, 0.10)",
                            borderRight:
                              index === rowItem.totalAllocations.length - 1
                                ? "5px solid grey"
                                : "1px solid rgba(33, 63, 125, 0.10)",
                          }}
                        >
                          {new Intl.NumberFormat().format(allocation.balance) ||
                            ""}
                        </Td>
                      ))}
                      <Td>
                        <SelectFieldWrapper
                          as="select"
                          name="projectStatus"
                          value={
                            role === "Individual"
                              ? `Status: ${rowItem.status}`
                              : "Update Status"
                          }
                          onChange={(e) => handleStatusChange(e, rowItem.projectId)}
                          disabled={role === "Individual"}
                          style={{
                            appearance:
                              role === "Individual" ? "none" : "auto",
                            MozAppearance:
                              role === "Individual" ? "none" : "auto",
                            WebkitAppearance:
                              role === "Individual" ? "none" : "auto",
                          }}
                        >
                          <option value="Ongoing">Status: {rowItem.status}</option>
                          {actions(role, rowItem?.status)?.map((status, key) => (
                            <option key={key} value={status}>
                              {status}
                            </option>
                          ))}
                        </SelectFieldWrapper>
                      </Td>
                    </React.Fragment>
                  )}
              </tr>
            ))}
            {(location === "dataOverviewArea" ||
              location === "archivesArea") && (
                <tr>
                  <Td style={{ fontWeight: 600 }}>Total</Td>
                  {/* Empty cell for organization name */}
                  {role === "SuperAdmin" && <Td></Td>}
                  {/* Sum total allocation for each unique currency */}
                  {uniqueCurrencies?.map((uniqueCurrency, index) => {
                    // Initialize a sum variable
                    let currencyTotal = 0;
                    // Loop through rowItems and sum the totalAllocations for the current uniqueCurrency
                    rowItems?.forEach((rowItem) => {
                      rowItem?.totalAllocations?.forEach((totalAllocation) => {
                        if (totalAllocation.currencyName === uniqueCurrency) {
                          currencyTotal += totalAllocation.amountAllocated;
                        }
                      });
                    });
                    // Return the <Td> element with the summed total for the currency
                    return (
                      <Td
                        key={uniqueCurrency}
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          borderLeft:
                            index === 0
                              ? "5px solid grey"
                              : "1px solid rgba(33, 63, 125, 0.10)",
                        }}
                      >
                        {new Intl.NumberFormat().format(currencyTotal)}
                      </Td>
                    );
                  })}
                  {/* Sum total disbursements for each unique currency */}
                  {uniqueCurrencies?.map((uniqueCurrency, index) => {
                    // Initialize a sum variable
                    let currencyTotal = 0;
                    // Loop through rowItems and sum the disbursements for the current uniqueCurrency
                    rowItems?.forEach((rowItem) => {
                      rowItem?.totalAllocations.forEach((totalAllocation) => {
                        if (totalAllocation.currencyName === uniqueCurrency) {
                          currencyTotal += totalAllocation.amountDisbursed;
                        }
                      });
                    });
                    // Return the <Td> element with the summed total for the currency
                    return (
                      <Td
                        key={uniqueCurrency}
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          borderLeft:
                            index === 0
                              ? "5px solid grey"
                              : "1px solid rgba(33, 63, 125, 0.10)",
                        }}
                      >
                        {new Intl.NumberFormat().format(currencyTotal)}
                      </Td>
                    );
                  })}
                  {/* Sum total balance for each unique currency */}
                  {uniqueCurrencies?.map((uniqueCurrency, index) => {
                    // Initialize a sum variable
                    let currencyTotal = 0;
                    // Loop through rowItems and sum the balance for the current uniqueCurrency
                    rowItems?.forEach((rowItem) => {
                      rowItem?.totalAllocations.forEach((totalAllocation) => {
                        if (totalAllocation.currencyName === uniqueCurrency) {
                          currencyTotal += totalAllocation.balance;
                        }
                      });
                    });
                    // Return the <Td> element with the summed total for the currency
                    return (
                      <Td
                        key={uniqueCurrency}
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          borderLeft:
                            index === 0
                              ? "5px solid grey"
                              : " 1px solid rgba(33, 63, 125, 0.10)",
                          borderRight:
                            index === uniqueCurrencies.length - 1
                              ? "5px solid grey"
                              : "1px solid rgba(33, 63, 125, 0.10) ",
                        }}
                      >
                        {new Intl.NumberFormat().format(currencyTotal)}
                      </Td>
                    );
                  })}
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
